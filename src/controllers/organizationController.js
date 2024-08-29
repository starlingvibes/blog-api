const organizationRouter = require('express').Router();
const { response } = require('../utils/responses');
const { inputs } = require('../middlewares/organizationMiddleware');
const {
  organizations,
} = require('../services/organization/organizationServices');

organizationRouter.post('/', inputs.createOrganization(), async (req, res) => {
  try {
    const result = await organizations.createOrganization(req);
    response.success(res, 'Organization created successfully', result);
  } catch (error) {
    response.error(res, error.message);
  }
});

organizationRouter.post(
  '/employee',
  inputs.addOrganizationEmployee(),
  async (req, res) => {
    try {
      await organizations.addOrganizationEmployee(req);
      response.success(res, 'Employee added successfully', null);
    } catch (error) {
      response.error(res, error.message);
    }
  }
);

// organizationRouter.get('/', inputs.fetchOrganizations(), async (req, res) => {
//   try {
//     const result = await organizations.fetchAllOrganizations(req);
//     response.success(res, 'Organizations retrieved successfully', result);
//   } catch (error) {
//     response.error(res, error.message);
//   }
// });

// organizationRouter.get(
//   '/:organizationId',
//   inputs.fetchOrganization(),
//   async (req, res) => {
//     try {
//       const result = await organizations.fetchSingleOrganization(req);
//       response.success(res, 'Organization retrieved successfully', result);
//     } catch (error) {
//       response.error(res, error.message);
//     }
//   }
// );

// organizationRouter.put(
//   '/:organizationId',
//   inputs.createOrganization(),
//   async (req, res) => {
//     try {
//       const result = await organizations.updateOrganization(req);
//       response.success(res, 'Organization updated successfully', result);
//     } catch (error) {
//       response.error(res, error.message);
//     }
//   }
// );

// organizationRouter.delete(
//   '/:organizationId',
//   inputs.deleteOrganization(),
//   async (req, res) => {
//     try {
//       await organizations.deleteOrganization(req);
//       response.success(res, 'Organization deleted successfully', null);
//     } catch (error) {
//       response.error(res, error.message);
//     }
//   }
// );

module.exports = organizationRouter;
