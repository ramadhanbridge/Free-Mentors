class Message
{

   error = (res,status_code, error )=>
   {
    const data={"status":status_code,"error":error};
    return res.status(status_code).json(data)
   }
   
   success = (res, status_code, message , object )=>
   {
    const data={"status":status_code,"message":message,"data":object};
    return res.status(status_code).json(data)
   }

}
export default new Message() ;