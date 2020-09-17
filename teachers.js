const pool = require('./students')


const cohortName = process.argv[2]
pool
  .query(
    `
SELECT 
  teachers.name AS teacher, 
  cohorts.name AS cohort
FROM assistance_requests
  JOIN teachers ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`,
[cohortName]
  )
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => console.error('query error', err.stack));
