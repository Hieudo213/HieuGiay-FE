export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => resolve(render.result);
    render.onerror = (err) => reject(err);
  });

  export function getItem(label, key, icon, children, type){
    return{
      key,
      icon,
      children,
      label,
      type
    };
  }