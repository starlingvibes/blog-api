const { query } = require('./queryServices');
const { jwt } = require('../../utils/jwt');
const { helper } = require('../../utils/helpers');

class OrganizationServices {
  fetchAllOrganizations = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);
      return await query.fetchOrganizations(req.query);
    } catch (error) {
      throw error;
    }
  };

  fetchSingleOrganization = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);
      const data = await query.fetchOrganization(req.params.organizationId);
      if (!data) {
        return [];
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  createOrganization = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);

      return await query.createOrganization(req.body);
    } catch (error) {
      throw error;
    }
  };

  addOrganizationEmployee = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);

      const userAlreadyEmployed = await query.checkEmployee(req.body);
      if (userAlreadyEmployed) {
        throw new Error('User already employed');
      }

      return await query.addOrganizationEmployee(req.body);
    } catch (error) {
      throw error;
    }
  };

  updateOrganization = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);

      const organizationId = req.params.organizationId;
      const newData = req.body;

      return await query.updateOrganization(organizationId, newData);
    } catch (error) {
      throw error;
    }
  };

  deleteOrganization = async (req) => {
    try {
      const token = await helper.extractToken(req);
      await jwt.authAdmin(token);

      const organization = await query.fetchOrganization(
        req.params.organizationId
      );

      if (!organization) {
        throw new Error('Invalid organizationId');
      }

      return await query.deleteOrganization(req.params.organizationId);
    } catch (error) {
      throw error;
    }
  };
}

exports.organizations = new OrganizationServices();
