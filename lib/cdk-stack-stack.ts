import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import path = require("path");


enum Environment {
  LOCAL = "local",
  PROD = "prod"
}

export class CdkStackStack extends cdk.Stack {

  private readonly STACK_ENV = process.env["STACK_ENV"];

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, "CdkStackQueue", {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    let getPluginsLambda: lambda.Function;

    switch (this.STACK_ENV) {

      case Environment.LOCAL:
        getPluginsLambda = new NodejsFunction(this, "getPluginsLambda", {
          entry: path.join(__dirname, "../tasks/getPlugins/index.ts"),
          handler: "handler",
          runtime: lambda.Runtime.NODEJS_14_X
        });
        break;

      case Environment.PROD:
        getPluginsLambda = new lambda.DockerImageFunction(this, "getPluginsLambda", {
          code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, "../tasks/getPlugins")),
        });
        break;

      default: {
        throw new Error("Unkown stack environment");
      }
    }

    const cronJob = new events.Rule(this, "cronJob", {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1)),
      targets: [new targets.LambdaFunction(getPluginsLambda)]
    });

  }
}
