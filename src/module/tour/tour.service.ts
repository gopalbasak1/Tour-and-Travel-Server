import QueryBuilder from '../../builder/queryBuilder'
import { searchableFields } from './tour.constant'
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload)

  //   data.color = "red"

  const result = await data.save()
  return result
}

const getTours = async (query: Record<string, unknown>) => {
  // // Clone the query object to avoid modifying the original
  // const queryObj = { ...query }
  // console.log('Original Query:', queryObj)

  // // Fields to exclude from the query object
  // // The term "excluding" in your context is referring to removing specific fields from an object (in this case, queryObj) that you do not want to include in the final query to the database.

  // // Fields to exclude from filtering, like 'searchTerm' used for text search
  // const excludingImportant = [
  //   'searchTerm',
  //   'page',
  //   'limit',
  //   'sortOrder',
  //   'fields',
  // ]

  // excludingImportant.forEach((key) => delete queryObj[key]) // Remove excluded fields

  // console.log('Filtered Query Object:', queryObj)

  // // Default searchTerm to an empty ('') string if not provided
  // const searchTerm = query?.searchTerm || ''

  // /**
  //  * 1. Defines the fields in the Tour collection that will be used to match the searchTerm.
  //  * name: Tour's name.
  //  * startLocation: Starting point of the tour.
  //  * locations: Array of locations visited during the tour.
  //  */

  // //name, startLocation, locations
  // const searchableFields = ['name', 'startLocation', 'locations']

  // // const result = await Tour.find({
  // //   $or: [
  // //     { name: { $regex: searchTerm, $options: 'i' } },
  // //     { startLocation: { $regex: searchTerm, $options: 'i' } },
  // //     { locations: { $regex: searchTerm, $options: 'i' } },
  // //   ],
  // // })

  // //   Mapping Fields for $regex Search:

  // // searchableFields.map((field) => ({ [field]: { $regex: searchTerm, $options: 'i' } }))
  // // This creates an array of objects, where each object has a field with a regular expression condition.
  // // Example for searchTerm = 'city':

  // // javascript
  // // Copy code
  // // [
  // //   { name: { $regex: 'city', $options: 'i' } },
  // //   { startLocation: { $regex: 'city', $options: 'i' } },
  // //   { locations: { $regex: 'city', $options: 'i' } }
  // // ]
  // // Combining with $or:

  // // The array is passed to $or to allow matching any one of the conditions.
  // // Executing the Query:

  // // Tour.find(searchQuery) retrieves all documents that match the constructed query.

  // // const result = await Tour.find({
  // //   $or: searchableFields.map((field) => ({
  // //     [field]: { $regex: searchTerm, $options: 'i' },
  // //   })),
  // // });

  // //Example
  // //   await getTours({
  // //     searchTerm: 'city',
  // //     durationHours: { $gte: 5 },
  // //     price: { $lte: 100 },
  // //   });

  // //   Original Query: { searchTerm: 'city', durationHours: { $gte: 5 }, price: { $lte: 100 } }
  // // Filtered Query Object: { durationHours: { $gte: 5 }, price: { $lte: 100 } }
  // // Final Query: {
  // //   $or: [
  // //     { name: { $regex: 'city', $options: 'i' } },
  // //     { startLocation: { $regex: 'city', $options: 'i' } },
  // //     { locations: { $regex: 'city', $options: 'i' } }
  // //   ],
  // //   durationHours: { $gte: 5 },
  // //   price: { $lte: 100 }
  // // }

  // const searchQuery = Tour.find({
  //   $or: searchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // // Add any additional filters (e.g., duration, price) to the query
  // //const result = await searchQuery.find(queryObj);

  // const filterQuery = searchQuery.find(queryObj)

  // const page = Number(query?.page) || 1
  // const limit = Number(query?.limit) || 10
  // // skip = (page - 1) * limit
  // const skip = (page - 1) * limit

  // //const result = await filterQuery.skip(skip).limit(limit)

  // const paginatedQuery = filterQuery.skip(skip).limit(limit)

  // let sortString = '-price'

  // if (query?.sortBy && query?.sortOrder) {
  //   const sortBy = query?.sortBy
  //   const sortOrder = query?.sortOrder
  //   sortString = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
  // }

  // //   Example:
  // // sortBy = "name" and sortOrder = "asc" → sortString = "name".
  // // sortBy = "price" and sortOrder = "desc" → sortString = "-price".

  // const sortQuery = paginatedQuery.sort(sortString)

  // let fields = '-_v'

  // //Default Fields: Excludes the "_v "field (often used by Mongoose for internal versioning).

  // if (query?.fields) {
  //   fields = (query.fields as string)?.split(',').join(' ')
  // }

  // const result = await sortQuery.select(fields)

  const tours = new QueryBuilder(Tour.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select()

  const result = await tours.modelQuery

  return result
}

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id)
  return result
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload)
  return result
}

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id)
  return result
}

const getNextSchedule = async (id: string) => {
  const tour = await Tour.getNextNearestStartDateAndEndData()
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

  return {
    tour,
    // nextSchedule,
  }
}

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
