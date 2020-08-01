/* To implement 'Model-Adapter Pattern'.
*/

export interface Adapter<T> {
   adapt(item: any): T;
}
