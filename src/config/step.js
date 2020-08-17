export const stepsConfig = {
  'environments': {
    label: 'Environments connection',
    substeps: ['sourceenvironment', 'targetenvironment'],
    parent: true
  },
  'sourceenvironment': {
    label: 'Source environment',
  },
  'targetenvironment': {
    label: 'Target environment',
  },
  'entities': {
    label: 'Entities for migration',
    parent: true
  },
  'map': {
    label: 'Map',
    substeps: ['mapusers', 'mapbusinessunits', 'mapteams'],
    parent: true
  },
  'mapusers': {
    label: 'Map Users',
  },
  'mapbusinessunits': {
    label: 'Map Business Units',
  },
  'mapteams': {
    label: 'Map Teams',
  },
  'summary': {
    label: 'Schedule',
    parent: true
  }
}