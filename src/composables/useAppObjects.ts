
import { objectToQueryString } from '@/helpers/http'
import { CapacitorHttp } from '@capacitor/core'

export interface PhoneType {
    id: number
    key: 'number' | 'director' | 'whatsapp' | string
    name: string
    is_publicly: boolean
    order: number
}

export interface AppObjectPhoneItem {
    id: number
    phone_type_id: number
    phone_type: PhoneType
    number: string
}

export interface SocialNetworkType {
    id: number
    key: 'facebook' | 'instagram' | 'youtube' | string
    name: string
}

export interface ObjectSocialNetworkData {
    id: number
    link: string
    social_network?: SocialNetworkType
    social_network_id?: number
}

export interface ObjectImageData {
    object_id: number
    image_type: string
    image: Partial<File>
}

export interface AppObjectImage {
    id: number
    image: string
    image_type: string
    image_type_verbose: string
    order: number
}

export interface AppObjectLocation {
    latitude: number
    longitude: number
    city: string
    street: string
    building: string
    comment?: string
}

export interface AppObjectSpecification {
    id: number
    slug: string
    name: string
    type: string // ToDo: Add AppSpecificationType
    type_verbose: string
}

export interface AppObject {
    id: number
    type: AppObjectType
    name: string
    shortDescription: string
    slug: string
    photos: AppObjectImage[]
    // attachments: AppObjectAttachment[]
    location: AppObjectLocation
    social_networks?: ObjectSocialNetworkData[]
    avg_rating: number | null
    reviews_count: number | null
    specifications: {
        id: number
        specification_id: number
        specification: AppObjectSpecification
    }[]
    phone_numbers: AppObjectPhoneItem[]
    [key: string]: any
}

export interface ObjectsSearchFilters {
    /**
     * List of ids to exclude from the response.
     * Example: "1,2,3"
     */
    excludes?: string;

    /**
     * Filter by popular objects.
     * Example: true
     */
    is_popular?: boolean;

    /**
     * Number of results to return per page.
     * Example: 10
     */
    items_per_page?: number;

    /**
     * A page number within the paginated result set.
     * Example: 1
     */
    page?: number;

    /**
     * Filter by regions (list of region IDs).
     * Example: "1,2,3"
     */
    regions?: string;

    /**
     * Search by name.
     * Example: "MyObject"
     */
    search?: string;

    /**
     * Skip facets in the response.
     * Example: true
     */
    skip_facets?: boolean;

    /**
     * Filter by specifications (list of specification slugs).
     * Example: "restaurant,pub"
     */
    specifications?: string;

    /**
     * Filter by type (list of types).
     * Example: "1,2"
     */
    type?: AppObjectType;
}

export const useAppObjects = () => {
    const objectsSearch = async (searchFilters: ObjectsSearchFilters): Promise<AppHttpResponse<ABackendResponse<AppObject>>> => {
        const query = objectToQueryString(searchFilters)

        return  await CapacitorHttp.get({
            url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/objects/search/?${query}`,
            headers: {
                'Accept': 'application/json',
            },
        })
    }

    return {
        objectsSearch
    }
}
