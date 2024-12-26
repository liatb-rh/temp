/* tslint:disable */
/* eslint-disable */
/**
 * Migration Planner API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: undefined
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Inventory } from './Inventory';
import {
    InventoryFromJSON,
    InventoryFromJSONTyped,
    InventoryToJSON,
} from './Inventory';

/**
 * 
 * @export
 * @interface Source
 */
export interface Source {
    /**
     * 
     * @type {string}
     * @memberof Source
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Source
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Source
     */
    status: SourceStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof Source
     */
    statusInfo: string;
    /**
     * 
     * @type {Inventory}
     * @memberof Source
     */
    inventory?: Inventory;
    /**
     * 
     * @type {string}
     * @memberof Source
     */
    credentialUrl?: string;
    /**
     * 
     * @type {Date}
     * @memberof Source
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Source
     */
    updatedAt: Date;
}


/**
 * @export
 */
export const SourceStatusEnum = {
    NotConnected: 'not-connected',
    WaitingForCredentials: 'waiting-for-credentials',
    Error: 'error',
    GatheringInitialInventory: 'gathering-initial-inventory',
    UpToDate: 'up-to-date'
} as const;
export type SourceStatusEnum = typeof SourceStatusEnum[keyof typeof SourceStatusEnum];


/**
 * Check if a given object implements the Source interface.
 */
export function instanceOfSource(value: object): value is Source {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('statusInfo' in value) || value['statusInfo'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function SourceFromJSON(json: any): Source {
    return SourceFromJSONTyped(json, false);
}

export function SourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Source {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'status': json['status'],
        'statusInfo': json['statusInfo'],
        'inventory': json['inventory'] == null ? undefined : InventoryFromJSON(json['inventory']),
        'credentialUrl': json['credentialUrl'] == null ? undefined : json['credentialUrl'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function SourceToJSON(value?: Source | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'name': value['name'],
        'status': value['status'],
        'statusInfo': value['statusInfo'],
        'inventory': InventoryToJSON(value['inventory']),
        'credentialUrl': value['credentialUrl'],
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': ((value['updatedAt']).toISOString()),
    };
}

