import Dexie, { Table } from 'dexie';

export interface PendingReport {
  id?: number;
  well_id: number;
  fault_type: string;
  description: string;
  media_blobs: Blob[];
  timestamp: number;
}

export class KoskigoOfflineDB extends Dexie {
  pendingReports!: Table<PendingReport>;

  constructor() {
    super('KoskigoOfflineDB');
    this.version(1).stores({
      pendingReports: '++id, well_id, timestamp'
    });
  }
}

export const db = new KoskigoOfflineDB();