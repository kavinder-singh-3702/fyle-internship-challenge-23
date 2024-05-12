import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, any> = new Map<string, any>();

  constructor() {}

  // Store data in the cache
  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  // Retrieve data from the cache
  get(key: string): any {
    return this.cache.get(key);
  }

  // Check if data exists in the cache
  has(key: string): boolean {
    return this.cache.has(key);
  }

  // Clear the entire cache
  clear(): void {
    this.cache.clear();
  }

  // Remove a specific entry from the cache
  remove(key: string): void {
    this.cache.delete(key);
  }
}
