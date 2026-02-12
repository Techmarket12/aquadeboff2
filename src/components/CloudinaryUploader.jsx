import React from "react";

const CLOUDINARY_CLOUD_NAME = "dw9jkwccj";
const CLOUDINARY_UPLOAD_PRESET = "plombier_aquadeb";

export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Cloudinary upload failed: ${msg}`);
  }

  const data = await res.json();
  if (!data.secure_url) throw new Error("No secure_url returned by Cloudinary");
  return data.secure_url;
}

export async function uploadFiles(files) {
  const fileArray = Array.from(files);
  return Promise.all(fileArray.map(uploadImageToCloudinary));
}

export default function CloudinaryUploader({ onFilesChange }) {
  return (
    <div className="space-y-3 rounded-xl border-2 border-dashed border-slate-300 p-4 bg-slate-50">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onFilesChange?.(e.target.files)}
        className="text-sm"
      />
      <p className="text-xs text-slate-500">JPG/PNG, multiple autorisé. Lé?Tenvoi se fera au clic sur é?oEnvoyeré?é.</p>
    </div>
  );
}







