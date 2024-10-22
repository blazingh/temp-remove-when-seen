"use server";

import { APIROUTE, IRoutePramsType } from '@/constants/api_routes';
import { omitBy, isNil, isEmpty } from 'lodash';

export async function getBlogList(params?: IRoutePramsType): Promise<any> {

    const cleanedParams = omitBy(params, (value) => isNil(value) || isEmpty(value))
    const parametreArray = {
        ...cleanedParams,
        limit: '10'
    }

    const req = await fetch(APIROUTE('getBlogsList', parametreArray), {
        method: 'GET',
        next: { revalidate: 0 },
    });

    if (!req.ok) {
        console.error("Error fetching dentist list : \n", (await req.json()).error)
        return null
    }
    const data = await req.json()
    return data
}
