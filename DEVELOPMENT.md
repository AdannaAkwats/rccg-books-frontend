One time action to set up GitHub actions to create pipeline 

## Step 1: Register GitHub's OIDC provider within the AWS account
```
aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com \
    --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

## Step 2: Create IAM Role for GitHub Actions
Run this AWS CLI command to create the role:
```bash
aws iam create-role \
  --role-name github-actions-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Federated": "arn:aws:iam::441248530603:oidc-provider/token.actions.githubusercontent.com"
        },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition": {
          "StringLike": {
            "token.actions.githubusercontent.com:sub": "repo:AdannaAkwats/rccg-books-frontend:ref:refs/heads/main"
          }
        }
      }
    ]
  }'
```

## Step 3: Attach Policy to the Role
Attach a policy allowing CDK deployments:
```bash
aws iam put-role-policy \
  --role-name github-actions-role \
  --policy-name github-actions-cdk-policy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "cloudformation:*",
          "s3:*",
          "cloudfront:*",
          "iam:PassRole",
          "iam:GetRole",
          "iam:CreateRole",
          "iam:DeleteRole",
          "iam:PutRolePolicy",
          "iam:DeleteRolePolicy",
          "iam:AttachRolePolicy",
          "iam:DetachRolePolicy"
        ],
        "Resource": "*"
      }
    ]
  }'
```

## Step 4: Add GitHub Repository Variables
In your GitHub repo, go to **Settings → Secrets and Variables → Variables** and add:
- `AWS_ACCOUNT_ID`: `441248530603`
- `AWS_REGION`: `us-east-1`
- `AWS_ROLE_ARN`: `arn:aws:iam::441248530603:role/github-actions-role`

## Step 5: Bootstrap CDK (one-time local setup)
```bash
cd infra
npx cdk bootstrap
cd ..
```

## Step 6: Deploy
Push any changes to main branch. GitHub Actions will automatically build and deploy!

```
 aws configure sso
 <set the profile name>

 npx cdk bootstrap aws://441248530603/us-west-2 --profile <profile-name-set>
```