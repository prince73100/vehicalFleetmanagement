import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../hook/apiServices';

const VehicleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      capacityInkg: '',
      tyres: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitMessage('');

    try {
      const vehicleData = {
        name: data.name.trim(),
        capacityInkg: parseFloat(data.capacityInkg),
        tyres: parseInt(data.tyres)
      };

      const response = await api.post('/add-vehical',vehicleData );
   
      if (response.status===201) {
        setSubmitMessage('Vehicle created successfully!');
        reset();
      } else {
        setSubmitMessage(result.message || 'Failed to create vehicle');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
            <h1 className="text-2xl font-bold text-white">Add New Vehicle</h1>
            <p className="text-blue-100 mt-2">Fill in the details below</p>
          </div>

         
          <div className="px-6 py-8">
            <div className="space-y-6">
            
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Vehicle name is required',
                    minLength: {
                      value: 2,
                      message: 'Vehicle name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Vehicle name must not exceed 50 characters'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter vehicle name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

             
              <div>
                <label htmlFor="capacityInkg" className="block text-sm font-semibold text-gray-700 mb-2">
                  Capacity (kg)
                </label>
                <input
                  id="capacityInkg"
                  type="number"
                  step="0.1"
                  {...register('capacityInkg', {
                    required: 'Capacity is required',
                    min: {
                      value: 0.1,
                      message: 'Capacity must be greater than 0'
                    },
                    max: {
                      value: 100000,
                      message: 'Capacity must not exceed 100,000 kg'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.capacityInkg ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter capacity in kg"
                />
                {errors.capacityInkg && (
                  <p className="mt-1 text-sm text-red-600">{errors.capacityInkg.message}</p>
                )}
              </div>

             
              <div>
                <label htmlFor="tyres" className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Tyres
                </label>
                <select
                  id="tyres"
                  {...register('tyres', {
                    required: 'Number of tyres is required'
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.tyres ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select number of tyres</option>
                  <option value="2">2 Tyres</option>
                  <option value="3">3 Tyres</option>
                  <option value="4">4 Tyres</option>
                  <option value="6">6 Tyres</option>
                  <option value="8">8 Tyres</option>
                  <option value="10">10 Tyres</option>
                  <option value="12">12 Tyres</option>
                </select>
                {errors.tyres && (
                  <p className="mt-1 text-sm text-red-600">{errors.tyres.message}</p>
                )}
              </div>

            
              <div
                onClick={handleSubmit(onSubmit)}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 cursor-pointer text-center ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Vehicle...
                  </div>
                ) : (
                  'Create Vehicle'
                )}
              </div>

            
              {submitMessage && (
                <div className={`p-4 rounded-lg text-center font-medium ${
                  submitMessage.includes('successfully')
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;