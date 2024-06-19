import Network from './Network';

export interface NetworkDetails {
  title: string;
  value: string;
}

class WhoIsService {
  public async getDetails(
    ipAddress?: string,
    details?: NetworkDetails[] | null,
  ): Promise<void | NetworkDetails[]> {
    if (this.isSameIP(ipAddress, details)) {
      return;
    }

    const network = new Network('https://ipwho.is');
    const response: any = await network.get(ipAddress ?? '');
    const location = this.formatLocation(
      response.city,
      response.country_code,
      response.postal,
    );
    const timezone = this.formatTimezone(response.timezone.utc);
    const values = [];
    values.push(
      {title: 'IP Address', value: response.ip},
      {title: 'Location', value: location},
      {title: 'Timezone', value: timezone},
      {title: 'ISP', value: response.connection.isp},
    );
    return values;
  }

  private isSameIP(ipAddress?: string, details?: NetworkDetails[] | null) {
    if (!details) {
      return false;
    }

    const ipAddressObj = details.find(d => d.title === 'IP Address');
    if (ipAddressObj && ipAddressObj.value === ipAddress) {
      return true;
    }

    return false;
  }

  private formatTimezone(utc: string) {
    return `UTC ${utc}`;
  }

  private formatLocation(city: string, country_code: string, postal: string) {
    return `${city}, ${country_code}, ${postal}`;
  }
}

export default WhoIsService;
