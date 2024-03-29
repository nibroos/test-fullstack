<?php

use Illuminate\Database\Query\Builder;

function getPaginateByBuilder(Builder $builder)
{
  $perPage = request('search_per_page', 5);
  return $builder->paginate($perPage);
}

function getObjectByBuilder(Builder $builder)
{
  return $builder->get();
}
