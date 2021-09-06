import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import FileHelper from "./fileHelper.js"
import { logger } from "./logger.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultDownloadsFolder = resolve(__dirname, '../', 'downloads')
export default class Routes {
  io
  constructor(downloadFolder = defaultDownloadsFolder){
    this.downloadFolder = downloadFolder
    this.fileHelper = FileHelper
  }

  setSocketInstance(io){
    this.io = io
  }

  async defaultRoute(request, response) {
    response.end('hello world')
  }

  async options(request, response) {
    response.writeHead(204)
    response.end('hello world')
  }

  async post(request, response) {
    logger.info('ae post')
    response.end()
  }

  async get(request, response) {
    const files = await this.fileHelper.getFilesStatus(this.downloadFolder)
    response.writeHead(200)
    response.end(JSON.stringify(files))
  }

  handler(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute
    
    return chosen.apply(this, [request, response])
  }
}