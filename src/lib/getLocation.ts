import * as fs from "fs";
import * as path from "path";
import getSize from "g-factor";

import { validDiff } from "@app/lib/utils";
import { IRefinedListItem } from "@app/lib/Interfaces";
export class FSSearch {
  FILE_AGE;
  constructor(FILE_AGE) {
    this.FILE_AGE = FILE_AGE;
  }
  showFiles = (dir, { filelist, RefinedFileList }) => {
    const self = this;
    RefinedFileList = RefinedFileList || [];
    filelist = filelist || [];
    let files;
    try {
      files = fs.readdirSync(dir);
    } catch (e) {
      // console.log("ERR_ACCESS_DENIED", dir);
      return { filelist, RefinedFileList };
    }
    files.forEach(function(file) {
      try {
        const fileStats = fs.statSync(dir + "/" + file);
        const absPath = path.resolve(dir + "/" + file);
        if (fileStats.isDirectory() && absPath.includes("/.")) {
          return { filelist, RefinedFileList };
        }
        if (fileStats.isDirectory() && file === "node_modules") {
          const fileMTime: any = fileStats.mtime;
          const timeCurrent: any = new Date();
          const timeDiff = timeCurrent - fileMTime;
          // Dir is valid as per the config
          if (validDiff(timeDiff, self.FILE_AGE)) {
            let fileDetailsObj: IRefinedListItem = {
              path: absPath,
              age: fileMTime,
            };
            // console.log(fileDetailsObj);
            RefinedFileList.push(fileDetailsObj);
          }
        } else if (fileStats.isDirectory()) {
          filelist = self.showFiles(dir + "/" + file, {
            filelist,
            RefinedFileList,
          }).filelist;
        }
      } catch (e) {
        // console.log("ERR_LOCATION_NOT_FOUND", dir);
      }
    });
    return { filelist, RefinedFileList };
  };
}
