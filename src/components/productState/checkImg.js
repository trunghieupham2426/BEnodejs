export const checkIMG = (state) => {
  const validImgName = ["png", "jpg", "jpeg", "PNG", "JPG"];
  const checkByte = 1024 * 1024;
  const files = state.imgName;
  if (files.length == 0) {
    alert("ban chua upload");
  } else {
    files.map((file) => {
      let imgName = file;
      let checkImg = validImgName.includes(imgName.slice(-3));
      if (!checkImg) {
        alert("vui long chon dung dinh dang");
      } else if (file.size > checkByte) {
        alert("vui long up anh duoi 1mb");
      }
    });
  }
};
