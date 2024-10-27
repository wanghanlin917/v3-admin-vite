import { request } from "@/utils/service"
import type * as upload from "@/api/common/type/common"

export function uploadDataApi(data: { file: File; type: string }) {
  console.log("接口", data.file)
  const fd = new FormData()
  fd.append("file", data.file)
  fd.append("type", data.type)
  // fd.append("type", data.type)
  console.log("hahahah")
  fd.forEach((e) => {
    console.log("t", e)
  })
  return request<upload.UploadResponseData>({
    url: "auth/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: fd
  })
}
