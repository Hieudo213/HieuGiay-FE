import axios from "axios";

export const createProduct = async (file, productDto, accessToken) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("productDto", JSON.stringify(productDto));
  const res = await axios.post(
    `http://localhost:8080/api/v1/product/add-product`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    }
  );
  return res.data;
};

export const updateProductById = async (
  productId,
  brandId,
  categoryId,
  productDto
) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/product/update`,
      productDto,
      {
        params: {
          productId: productId,
          brandId: brandId,
          categoryId: categoryId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateImageProductById = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.put(`http://localhost:8080/api/v1/product/update/image/${id}`,formData);
    window.location.reload();
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/api/v1/product/delete/${id}`);
    window.location.reload();
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const searchProductByTitle = async (title) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/v1/product/search`,
      {
        params: {
          title : title
        }
      }
    );
  
    return res.data;
  } catch (error) {
    throw error;
  }
};


