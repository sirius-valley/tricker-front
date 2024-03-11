## 👨‍🏭 Setting up Queries and Mutations using TanStack Query
---
### Queries 📝
To set up a query, you have to use the useQuery hook. It receives a unique query key used for caching and refetching data and a function that returns a promise:

```
useQuery({
    queryKey: [''],
    queryFn: () => {}
})
```

It also returns a lot of information, but the most used are data (obviously), error, isLoading & isError:

```
const { data, error, isLoading, isError } = useQuery({...})
```
---
### Mutations 🧬

For setting up a mutation, we will use the useMutation hook. Unlike the queries, it doesn't receive a queryKey, it only receives a function returning a promise (I recommend using axios.post):
```
useMutation({
    mutationFn: () => {...}
})
```
And it returns also a lot of information, the most used are: isPending, isError, error, isSuccess, reset and mutate. "mutate" is the mutation function you can call with variables to trigger the mutation, reset is a function that cleans the mutation internal state (set the other variables to default)

```
const { isPending, isError, error, isSuccess, reset, mutate } = useMutation({...})
```
---

 You can also check queryExample.tsx & mutationExample.tsx files to see more detailed examples of use.
Or [click here to read the docs.](https://tanstack.com/query/latest/docs/framework/react/overview)