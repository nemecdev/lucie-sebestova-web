import ConfigFile from "@/AppConfig.json"

export class ConfigProvider
{
  _method: string
  _supportedMethods: Array<string>

  constructor()
  {
    this._method = 'file'
    this._supportedMethods = [ 'file' ]
  }

  getConfig(): any | undefined
  {
    try {
      this._doChecks()
    } catch (err) {
      console.warn(err)

      return
    }

    return ConfigFile
  }

  _doChecks(): void
  {
    try {
      this._checkSupports()
      if (this._method === 'file') this._checkConfigFile()
    } catch (err) {
      throw err
    }
  }

  _checkSupports(): void
  {
    if (!this._supportedMethods.includes(this._method)) {
      throw new Error('Retrieve method | "' + this._method + '" | is not supported: ')
    }
  }

  _checkConfigFile(): void
  {
    if (!(ConfigFile instanceof Object)) {
      throw new Error('Config file loading is not successful')
    }
  }
}