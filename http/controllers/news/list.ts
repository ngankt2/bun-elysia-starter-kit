import {Faker, faker} from "@faker-js/faker";

export const validation = {
    detail: {
        tags: ['News'],
        summary: 'News listing',
        description: ''
    }
}

/**
 *
 * @param context
 * @url /api/news/list
 */
export async function main(context: any) {

    let items = [];

    for (let i = 0; i < 20; i++) {
        let item = {
            id: faker.number.int(),
            title: faker.lorem.sentence(),
            brief: faker.lorem.sentence(),
            slug: faker.lorem.slug(),
            categories: faker.lorem.slug(),
            auth: faker.person.fullName(),
        }
        items.push(item);
    }
    return {
        status: 200,
        message: context.t('hi'),
        data: {
            items: items,
            total: 1000,
        }
    };
}