import { logInfo, logSuccess, shSync } from "@tiga-cli/utils";

export default async function initGit() {
  logInfo("start init git");
  shSync("git init -b master", {
    errorText: "git init failed.",
    stdio: "pipe"
  });
  logSuccess("git init completed ~");
}
