class Message
{

   error = ( status_code, error )=>
   {
    const data={"status":status_code,"error":error};
    return data
   }
   
   success = ( status_code, message , object )=>
   {
    const data={"status":status_code,"message":message,"data":object};
    return data
   }

}
export default new Message() ;