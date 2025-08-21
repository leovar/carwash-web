import _ from 'lodash';
import { PartialDeep } from 'type-fest';
import { Company } from '../api/types';

/**
 * The product model.
 */
const CompanyModel = (data: PartialDeep<Company>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('company-'),
		address: '',
		city: '',
		companyCode: '',
		companyName: '',
		contactName: '',
		country: '',
		createdDate: '',
		description: '',
		email: '',
		isActive: true,
		mainCompany: '',
		nit: '',
		phone: '',
		region: ''
	});

export default CompanyModel;
