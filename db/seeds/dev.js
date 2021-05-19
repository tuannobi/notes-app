exports.seed = async function (knex) {
  // Truncate all existing tables
  await knex.raw('TRUNCATE TABLE "notes" CASCADE');
  await knex.raw('TRUNCATE TABLE "demo" CASCADE');

  await knex("notes").insert([
    {
      id: 1,
      title: "Note1",
      content: "Content1",
    },
    {
      id: 2,
      title: "Note2",
      content: "Content2"
    }
  ]);
};
