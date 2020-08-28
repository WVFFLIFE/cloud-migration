export const stepsConfig = {
  'environments': {
    label: 'Environments connection',
    isActive: false,
    isValid: false,
    substeps: ['sourceenvironment', 'targetenvironment'],
    parent: true,
  },
  'sourceenvironment': {
    label: 'Source environment',
    isActive: false,
    isValid: false,
  },
  'targetenvironment': {
    label: 'Target environment',
    isActive: false,
    isValid: false,
  },
  'entities': {
    label: 'Entities for migration',
    isActive: false,
    isValid: false,
    parent: true
  },
  'map': {
    label: 'Map',
    isActive: false,
    isValid: false,
    substeps: ['mapusers', 'mapbusinessunits', 'mapteams'],
    parent: true
  },
  'mapusers': {
    label: 'Map Users',
    isActive: false,
    isValid: false,
  },
  'mapbusinessunits': {
    label: 'Map Business Units',
    isActive: false,
    isValid: false,
  },
  'mapteams': {
    label: 'Map Teams',
    isActive: false,
    isValid: false,
  },
  'summary': {
    label: 'Schedule',
    isActive: false,
    isValid: false,
    parent: true
  }
}