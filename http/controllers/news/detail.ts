import {faker} from "@faker-js/faker";

export const validation = {
    detail: {
        tags: ['News'],
        summary: 'News Detail',
        description: ''
    }
}

/**
 *
 * @param context
 * @url /api/news/list
 */
export async function main(context: any) {

    let item = {
        id:  faker.number.int(),
        title: faker.lorem.sentence(),
        brief: faker.lorem.sentence(),
        slug: faker.lorem.slug(),
        categories: faker.lorem.slug(),
        auth: faker.person.fullName(),
    }
    return {
        status: 200,
        data: {
            item: item,
        }
    };
}