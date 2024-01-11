export default async function uploadToCloudinary(data){
    let res = await fetch(`https://api.cloudinary.com/v1_1/dv934lt48/auto/upload`, {
      method: 'POST',
      body: data,
    });
  
    if(res.status >= 500){
      return {
        ok: false,
        message:"external server error, we're doomed",
        body: null
      };
    } else if (res.status >= 400){
      return {
        ok: false,
        message:"Bad request :(",
        body: null
      };
    }
  
    try{
      res = await res.json();
      return{
        ok: true,
        body: res.secure_url
      };
    } catch (err) {
      return{
        ok: false,
        message: err.message,
        body: null
      };
    }
  }