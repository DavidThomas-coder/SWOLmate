/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.string("firstName").notNullable()
        table.integer("age").notNullable()
        table.string("pronouns").notNullable()
        table.string("cityNeighborhood").notNullable()
        table.text("experienceLevel").notNullable()
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("firstName")
        table.dropColumn("age")
        table.dropColumn("pronouns")
        table.dropColumn("cityNeighborhood")
        table.dropColumn("experienceLevel")
    })
}
