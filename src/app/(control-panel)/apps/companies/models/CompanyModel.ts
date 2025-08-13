import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { Company } from '../api/types';

/**
 * The product model.
 */
const CompanyModel = (data: PartialDeep<Company>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('company-'),
		companyName: '',
		licenseType: '',
		isActive: true,
		phone: '',
		endDate: '',
		creationDate: ''
	});

export default CompanyModel;
