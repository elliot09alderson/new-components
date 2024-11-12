const slug = name.split(" ").join("-");
        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });
        try {
          // Define the transformation parameters for cropping
          const cropParams = {
            width: 300,
            height: 300,
            crop: "crop", // Use 'crop' to perform cropping
            gravity: "auto", // Use 'auto' to automatically detect the most relevant region
          };
          // Upload the cropped image to Cloudinary
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categorys",
            resource_type: "image",
            transformation: cropParams,
          });
          // console.log(result, "result");
          if (result) {
            const category = await categoryModel.create({
              name,
              slug,
              image: result.url,
            });
            responseReturn(res, 201, {
              category,
              message: "category add success",
            });
          } else {
            responseReturn(res, 404, { error: "Image upload failed" });
          }
        } catch (error) {
          console.log(error);
          responseReturn(res, 500, { error: "Internal server error" });
        }
      }
