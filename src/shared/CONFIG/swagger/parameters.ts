export const parameters = {
  TenantHeader: {
    in: 'header',

    name: 'x-tenant-id',

    required: true,

    description:
      'Tenant identifier for multi-tenant requests',

    schema: {
      type: 'string',
      example: 'tenant_123',
    },
  },
}