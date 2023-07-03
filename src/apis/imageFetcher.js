import axios from "axios";

// 여기서는 Axios Instance 사용이 불가능 하므로,,,

async function postImageUploadRequestService(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.VUE_APP_CLOUD_PRESET);
  const uploadResult = await axios.post(
    `${process.env.VUE_APP_CLOUDE_BASE_URL}/${process.env.VUE_APP_CLOUD_NAME}/image/upload`,
    formData
  );
  const { secure_url } = uploadResult.data;
  return secure_url;
}

export { postImageUploadRequestService };
