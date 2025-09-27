function ProductsPage(){
    return(
        <div class="container mx-auto px-4 py-8">
  <h2 class="text-2xl font-semibold mb-4">Lista de Personal</h2>

  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
      <thead>
        <tr class="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <th class="px-6 py-3 border-b">ID</th>
          <th class="px-6 py-3 border-b">Nombre</th>
          <th class="px-6 py-3 border-b">Descripción</th>
          <th class="px-6 py-3 border-b">Precio</th>
          <th class="px-6 py-3 border-b">Cantidad</th>
          <th class="px-6 py-3 border-b">Garantia</th>
          <th class="px-6 py-3 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody class="text-sm text-gray-700">
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 border-b">1</td>
          <td class="px-6 py-4 border-b">Juan Pérez</td>
          <td class="px-6 py-4 border-b">juan@example.com</td>
          <td class="px-6 py-4 border-b flex gap-2">
            <button class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">Editar</button>
            <button class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-4">
    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">Agregar Usuario</button>
  </div>
</div>
    )
}



export default ProductsPage;