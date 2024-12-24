import getConfig from 'next/config';

export default class Config {
  private static configValues: Record<string, string | number> = {};

  public static init() {
    const config = getConfig();
    this.apiBaseURL = config.publicRuntimeConfig.API_PREFIX;
  }

  public static get apiBaseURL(): string {
    return (
      this.configValues.apiBaseURL || getConfig().publicRuntimeConfig.API_PREFIX
    );
  }

  public static set apiBaseURL(value: string) {
    this.configValues.apiBaseURL = value;
  }

  public static get basePath(): string {
    return (
      this.configValues.basePath || getConfig().publicRuntimeConfig.BASE_PATH
    );
  }

  public static set basePath(value: string) {
    this.configValues.basePath = value;
  }

  public static get yandexMetricaID(): number | undefined {
    return (
      this.configValues.yandexMetricaID ||
      getConfig().publicRuntimeConfig.YANDEX_COUNTER_ID
    );
  }

  public static set yandexMetricaID(value: number) {
    this.configValues.yandexMetricaID = value;
  }
}

Config.init();
