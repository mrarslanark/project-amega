import Network from './Network';

class WhoIs {
  public async getDetails(ipAddress?: string) {
    const network = new Network('https://ipwho.is');
    const response: any = await network.get(ipAddress ?? '');
    const location = this.formatLocation(
      response.city,
      response.country_code,
      response.postal,
    );
    const timezone = this.formatTimezone(response.timezone.utc);
    return {
      ipAddress: response.ip,
      location,
      timezone,
      isp: response.connection.isp,
    };
  }

  private formatTimezone(utc: string) {
    return `UTC ${utc}`;
  }

  private formatLocation(city: string, country_code: string, postal: string) {
    return `${city}, ${country_code}, ${postal}`;
  }
}

export default WhoIs;
