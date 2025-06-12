# Coffee Shop Foundation Service

**Shared Infrastructure Provider for the ONDEMANDENV Coffee Shop Demo**

This service provides the foundational infrastructure components that enable the coffee shop microservices ecosystem, demonstrating ONDEMANDENV's **Application-Centric Infrastructure** and **Product/Consumer** patterns.

## Service Overview

The Coffee Shop Foundation serves as the **shared infrastructure provider** in our multi-service architecture, publishing essential services that other microservices consume:

- **Event Bus**: Central communication backbone for inter-service messaging
- **Configuration Table**: DynamoDB table for application configuration storage  
- **Counter Table**: DynamoDB table for tracking business metrics and counters

## Architecture Role

```
┌─────────────────────────────────────────────────────────────┐
│                    Coffee Shop Architecture                 │
│                                                             │
│  ┌─────────────────┐    ┌──────────────────┐               │
│  │ Order Manager   │    │ Order Processor  │               │
│  │                 │    │                  │               │
│  │ Consumes:       │    │ Consumes:        │               │
│  │ • Event Bus     │    │ • Event Bus      │               │
│  │ • Config Table  │    │ • Config Table   │               │
│  │ • Counter Table │    │ • Counter Table  │               │
│  └─────────────────┘    └──────────────────┘               │
│           │                       │                        │
│           └───────────┬───────────┘                        │
│                       │                                    │
│                       ▼                                    │
│           ┌─────────────────────────┐                      │
│           │    Foundation Service   │ ◄── You Are Here     │
│           │                         │                      │
│           │ Publishes:              │                      │
│           │ • Event Bus Source      │                      │
│           │ • Configuration Table   │                      │
│           │ • Counter Table         │                      │
│           └─────────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

## Contract Definition

This service's contracts are defined in the [`contracts-sandbox`](../../contracts-sandbox) repository:

```typescript
// contracts-sandbox/lib/repos/coffee-shop/coffee-shop-foundation-cdk.ts
export class CoffeeShopFoundationEnver extends OdmdEnverCdk {
    readonly eventBusSrc: EvBusSrcRefProducer;
    readonly configTableName: OdmdCrossRefProducer<CoffeeShopFoundationEnver>;
    readonly countTableName: OdmdCrossRefProducer<CoffeeShopFoundationEnver>;
}
```

## Published Products

### 1. Event Bus Source (`eventBusSrc`)
- **Type**: AWS EventBridge Custom Bus
- **Purpose**: Central event routing for decoupled inter-service communication
- **Consumers**: Order Manager, Order Processor
- **Pattern**: Event-driven architecture backbone

### 2. Configuration Table (`configTableName`)  
- **Type**: DynamoDB Table
- **Purpose**: Centralized application configuration storage
- **Access Pattern**: Key-value lookup for service configurations
- **Consumers**: All services requiring configuration data

### 3. Counter Table (`countTableName`)
- **Type**: DynamoDB Table  
- **Purpose**: Business metrics and counters tracking
- **Access Pattern**: Atomic increment/decrement operations
- **Use Cases**: Order counts, processing metrics, business KPIs

## ONDEMANDENV Concepts Demonstrated

### **Application-Centric Infrastructure**
This service bundles related infrastructure components (EventBridge + DynamoDB) as a single, deployable unit rather than managing them separately.

### **Product/Consumer Pattern**
- **Publishes Products**: Makes infrastructure resources available to other services
- **Clear Interfaces**: Other services consume via well-defined contracts
- **Dependency Injection**: ONDEMANDENV platform handles connection details

### **Cross-Account Deployment**
- **Target**: Deploys to `workspace1` account (`590184130740`)
- **Region**: `us-west-1`
- **Platform Managed**: ONDEMANDENV handles cross-account IAM complexity

## Development Workflow

### **Local Development**
```bash
npm run build   # Compile TypeScript
npm run test    # Run unit tests
npm run watch   # Watch for changes
npx cdk synth   # Generate CloudFormation
```

### **Environment Management**

#### **Static Environments**
- **Master Branch**: Automatically deployed to workspace1 account
- **Immutable Versions**: Tag-based deployments for production

#### **On-Demand Cloning**
Create ephemeral development environments:
```bash
# In commit message on feature branch:
odmd: create@master

# Creates isolated foundation infrastructure for your feature
# Other services can clone and consume your foundation instance
```

#### **Cleanup**
```bash
# In commit message:
odmd: delete

# Removes your ephemeral environment
```

## Service Dependencies

### **Consumes From**
- No direct service dependencies (foundation layer)
- Platform services (networking, IAM) provided by ONDEMANDENV

### **Provides To**
- **Order Manager Service**: Event bus, configuration, counters
- **Order Processor Service**: Event bus, configuration, counters
- **Future Services**: Can easily consume foundation services via contracts

## Implementation Details

### **Infrastructure Components**
- **EventBridge Custom Bus**: For reliable event routing
- **DynamoDB Tables**: For configuration and metrics storage
- **IAM Roles**: Least-privilege access for consuming services
- **CloudWatch**: Monitoring and alerting

### **Resource Naming**
Resources are parameterized by branch/tag to enable isolation:
```typescript
// Example: foundation-master-eventbus vs foundation-feature-123-eventbus
const busName = `foundation-${branchName}-eventbus`;
```

### **Security Model**
- **Cross-account IAM**: Managed by ONDEMANDENV platform
- **Least Privilege**: Consuming services get minimal required permissions
- **Resource-level Policies**: Fine-grained access control

## Monitoring & Operations

### **Health Checks**
- EventBridge bus operational status
- DynamoDB table availability and performance
- Cross-service connectivity validation

### **Scaling Considerations**
- **DynamoDB**: On-demand billing for elastic scaling
- **EventBridge**: Automatically scales with event volume
- **Cross-Region**: Can deploy to multiple regions via contract updates

## Getting Started

1. **Understand the Contracts**: Review the service definition in [`contracts-sandbox`](../../contracts-sandbox/lib/repos/coffee-shop/coffee-shop-foundation-cdk.ts)

2. **Explore Dependencies**: See how other services consume foundation services in:
   - [`order-manager`](../coffee-shop--order-manager) 
   - [`order-processor`](../coffee-shop--order-processor)

3. **Deploy & Test**: 
   ```bash
   # Deploy to your AWS account (requires ONDEMANDENV platform setup)
   npx cdk deploy
   ```

4. **Learn ONDEMANDENV**: Visit the [platform documentation](../ondemandenv.github.io) for comprehensive guides

## Key Benefits Demonstrated

- **Shared Infrastructure as Code**: Foundation services defined and versioned like applications
- **Clear Service Boundaries**: Explicit contracts eliminate implicit dependencies  
- **Environment Isolation**: On-demand cloning provides safe development environments
- **Platform Abstraction**: Focus on business logic while platform manages AWS complexity
- **Dependency Management**: Automatic resolution and injection of required resources

This service showcases how ONDEMANDENV enables **true microservice independence** while maintaining **efficient resource sharing** through explicit, code-driven contracts.
