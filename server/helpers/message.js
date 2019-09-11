class Message
{

   error = (res,status_code, error )=>
   {
    const data={"status":status_code,"error":error};
    return res.status(status_code).json(data)
   }
   
   success = (res, status_code, message , data )=>
   {
      
      const info={"status":status_code,"message":message,data};
      return res.status(status_code).json(info)
   }

}
export default new Message() ;