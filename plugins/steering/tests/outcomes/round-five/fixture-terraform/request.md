Write a skill for our team that reviews a Terraform plan before it is applied. We run production on
AWS in one account, in us-west-2. The skill should tell an agent how to read the output of
`terraform plan` and report what must change before apply. Use `plan-2026-08-22.txt` in this
directory as the task to measure the skill against.
