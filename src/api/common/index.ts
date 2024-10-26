import { request } from "@/utils/service"
import type * as upload from "@/api/common/type/common"

export function uploadDataApi(data: { file: File }) {
  const fd = new FormData()
  fd.append("file", data.file)
  return request<upload.UploadResponseData>({
    url: "auth/upload",
    method: "post",
    data: fd
  })
}
