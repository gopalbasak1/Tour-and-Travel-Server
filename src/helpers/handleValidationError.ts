import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const handleValidationError = (err: any, res: Response) => {
  //er.errors
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      path: item.path,
      message: item.message,
    }
  }) // errors.errors(bookedSlots, totalPrice)

  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: err.message,
    issues: issues,
    error: err,
  })
}

// {
//     "success": false,
//     "message": "Booking validation failed: bookedSlots: Cast to Number failed for value \"dfs\" (type string) at path \"bookedSlots\", totalPrice: Cast to Number failed for value \"NaN\" (type number) at path \"totalPrice\"",
//     "error": {
//         "errors": {
//             "bookedSlots": {
//                 "stringValue": "\"dfs\"",
//                 "valueType": "string",
//                 "kind": "Number",
//                 "value": "dfs",
//                 "path": "bookedSlots",
//                 "reason": {
//                     "generatedMessage": true,
//                     "code": "ERR_ASSERTION",
//                     "actual": false,
//                     "expected": true,
//                     "operator": "=="
//                 },
//                 "name": "CastError",
//                 "message": "Cast to Number failed for value \"dfs\" (type string) at path \"bookedSlots\""
//             },
//             "totalPrice": {
//                 "stringValue": "\"NaN\"",
//                 "valueType": "number",
//                 "kind": "Number",
//                 "value": null,
//                 "path": "totalPrice",
//                 "reason": {
//                     "generatedMessage": true,
//                     "code": "ERR_ASSERTION",
//                     "actual": false,
//                     "expected": true,
//                     "operator": "=="
//                 },
//                 "name": "CastError",
//                 "message": "Cast to Number failed for value \"NaN\" (type number) at path \"totalPrice\""
//             }
//         },
//         "_message": "Booking validation failed",
//         "name": "ValidationError",
//         "message": "Booking validation failed: bookedSlots: Cast to Number failed for value \"dfs\" (type string) at path \"bookedSlots\", totalPrice: Cast to Number failed for value \"NaN\" (type number) at path \"totalPrice\""
//     }
// }
