import { parseCidr } from 'cidr-tools';
import isCidr from 'is-cidr';

export class CIDR {
  valid: boolean;
  cidr: string;
  network: string;
  netmask: number;
  start: bigint;
  end: bigint;
  octet1: number;
  octet2: number;
  octet3: number;
  octet4: number;

  constructor(cidr: string = '') {
    this.cidr = cidr;
    this.valid = isCidr(cidr) == 4;
    if (!this.valid) {
      throw new Error(`Invalid CIDR: ${cidr}`);
    }

    // Parse details if valid
    const parsed_cidr = parseCidr(this.cidr);
    this.start = parsed_cidr.start;
    this.end = parsed_cidr.end;

    const cidr_components = cidr.split('/');
    this.network = cidr_components[0];
    this.netmask = parseInt(cidr_components[1], 10);

    [this.octet1, this.octet2, this.octet3, this.octet4] = this.network
      .split('.')
      .map((s) => parseInt(s, 10));
  }
}
