FROM public.ecr.aws/lambda/nodejs:14 AS build
# Assumes your function is named "app.js", and there is a package.json file in the app directory 
COPY index.ts ../package.json ../tsconfig.json  ${LAMBDA_TASK_ROOT}/
# Install NPM dependencies for function
RUN npm install
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:14 AS prod
COPY --from=build dist/ ${LAMBDA_TASK_ROOT}/
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "dist/index.handler" ]
