import { FilterQuery, Query } from 'mongoose'

/**
 * This is a generic class where T represents the type of documents being queried from the database.
 * This ensures the class works with any Mongoose model while preserving type safety.
 */
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>
  /**
   * modelQuery:
   * Stores the Mongoose Query object.
   * Type: Query<T[], T> (a Mongoose query that returns an array of type T documents).
   * query:
   * Stores the query parameters for filtering, sorting, pagination, etc.
   * Type: Record<string, unknown> (an object with key-value pairs).
   *
   */
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
    //Initializes modelQuery and query properties with the provided arguments.
  }

  //search

  search(searchableFields: string[]) {
    // this.query mudhaka thaka searchTerm niya asta hoba
    const searchTerm = this?.query?.searchTerm

    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map((field: any) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    } as FilterQuery<T>)

    return this
  }

  // filter
  filter() {
    const queryObj = { ...this?.query }
    const excludingImportant = [
      'searchTerm',
      'page',
      'limit',
      'sortOrder',
      'sortBy',
      'fields',
    ]

    excludingImportant.forEach((key) => delete queryObj[key])
    // Apply the filtered query object to the model query

    // Without reassignment, the filter would be ignored:
    //this.modelQuery.find({ price: 50 }); // Does nothing if not reassigned.
    // With reassignment, the filter is added:
    //this.modelQuery = this.modelQuery.find({ price: 50 });

    this.modelQuery = this.modelQuery.find(queryObj)

    return this
  }

  //pagination

  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  //sort
  sort() {
    let sortString

    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy
      const sortOrder = this?.query?.sortOrder

      sortString = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
    }
    this.modelQuery = this?.modelQuery?.sort(sortString)

    return this
  }

  //select
  select() {
    let fields = '-_v'

    //Default Fields: Excludes the "_v "field (often used by Mongoose for internal versioning).

    if (this?.query?.fields) {
      fields = (this?.query.fields as string)?.split(',').join(' ')
    }

    this.modelQuery = this?.modelQuery?.select(fields)

    return this
  }

  ///
}

export default QueryBuilder
