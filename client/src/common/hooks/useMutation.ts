import {useMutation as mutation} from 'react-query';

// It's a workaround because of typings bug in react-query
export const useMutation = mutation as any;