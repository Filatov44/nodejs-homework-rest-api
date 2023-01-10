const User = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

// создаем путь к папке аватар
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  // забираем значение пути в tempUpload и originalname
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    // делаем уникальное имя файла
    const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);
  // перемещаем файд в нужную папку
    await fs.rename(tempUpload, resultUpload);
    
    const avatarURL = path.join("avatars", fileName);

    // сохраняем в базе
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })
    
}

module.exports = updateAvatar;