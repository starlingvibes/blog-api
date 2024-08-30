const {
  User,
  Security,
  Organization,
  EmployeeOrganization,
  OrganizationContent,
} = require('../../database/models');
const { Op } = require('sequelize');

class QueryServices {
  accessUser = async (userId) => {
    try {
      return await User.findOne({ where: { userId } });
    } catch (error) {
      throw error;
    }
  };

  accessUserWithEmail = async (email) => {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  };

  securityCheck = async (userId) => {
    try {
      return await Security.findOne({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  };

  checkEmployee = async (data) => {
    try {
      const { userId, organizationId } = data;
      const record = await EmployeeOrganization.findOne({
        where: { userId, organizationId },
      });

      return !!record;
    } catch (error) {
      throw error;
    }
  };

  addOrganizationEmployee = async (data) => {
    try {
      const { userId, organizationId, position } = data;
      await EmployeeOrganization.create({ userId, organizationId, position });
    } catch (error) {
      throw error;
    }
  };

  fetchOrganizations = async (query) => {
    try {
      let { page = 1, limit = 10, title, q } = query;

      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      let where = {};

      if (title) where = { ...where, title: { [Op.like]: `%${title}%` } };

      if (q)
        where = {
          ...where,
          [Op.or]: [{ name: { [Op.like]: `%${q}%` } }],
        };

      const { count, rows } = await Organization.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit,
        include: [
          {
            model: OrganizationContent,
            as: 'organizationContent',
            attributes: ['html', 'markdown'],
          },
        ],
      });

      return {
        total: count,
        page,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: Math.ceil(count / limit) > page ? page + 1 : null,
        lastPage: Math.ceil(count / limit),
        items: rows,
      };
    } catch (error) {
      throw error;
    }
  };

  fetchOrganization = async (organizationId) => {
    try {
      const organization = await Organization.findOne({
        where: { organizationId },
      });
      return organization;
    } catch (error) {
      throw error;
    }
  };

  createOrganization = async (data) => {
    try {
      return await Organization.create({ ...data });
    } catch (error) {
      throw error;
    }
  };

  updateOrganization = async (organizationId, newData) => {
    try {
      const organization = await Organization.findOne({
        where: { organizationId },
      });
      if (!organization) {
        throw new Error('Organization not found');
      }
      await organization.update({ ...newData });
      return organization;
    } catch (error) {
      throw error;
    }
  };

  deleteOrganization = async (organizationId) => {
    try {
      return await Organization.destroy({ where: { organizationId } });
    } catch (error) {
      throw error;
    }
  };
}

exports.query = new QueryServices();
