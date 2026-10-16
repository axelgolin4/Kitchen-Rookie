            <div class="input-group mb-3 TRS" id="PaisDiv">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="fa fa-flag"></i>
                </div>
                <select class="form-control" name="Pais" id="Pais" onchange="CamposxPais($(this).val())" required>
                    <option value="" disabled selected>Elija un país</option>
                    <?php
                    $SQL = sqlsrv_query($connARANDABD, "SELECT NombrePais,idCRM from Speede_Paises with(NOLOCK)");
                    while ($A = sqlsrv_fetch_array($SQL)) {
                    ?>
                        <option value="<?php echo $A['idCRM'] ?>"><?php echo utf8_encode($A['NombrePais']) ?></option>
                    <?php
                    }
                    ?>
                </select>
                </br>
            </div>



            <div class="input-group mb-3 guate" style="display:none">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="fas fa-map-pin"></i>
                </div>
                <select class="form-control" name="Zona_Gua" id="Zona_Gua" onchange="" required>
                    <option value="" disabled selected>Elija una zona</option>
                    <option value="1">Zona 1</option>
                    <option value="2">Zona 2</option>
                    <option value="3">Zona 3</option>
                    <option value="4">Zona 4</option>
                    <option value="5">Zona 5</option>
                    <option value="6">Zona 6</option>
                    <option value="7">Zona 7</option>
                    <option value="8">Zona 8</option>
                    <option value="9">Zona 9</option>
                    <option value="10">Zona 10</option>
                    <option value="11">Zona 11</option>
                    <option value="12">Zona 12</option>
                    <option value="13">Zona 13</option>
                    <option value="14">Zona 14</option>
                    <option value="15">Zona 15</option>
                    <option value="16">Zona 16</option>
                    <option value="17">Zona 17</option>
                    <option value="18">Zona 18</option>
                    <option value="19">Zona 19</option>
                    <option value="20">Zona 20</option>
                    <option value="21">Zona 21</option>
                    <option value="22">Zona 22</option>
                    <option value="23">Zona 23</option>
                    <option value="24">Zona 24</option>
                    <option value="25">Zona 25</option>
                </select>
                </br>
            </div>

            <div class="TRS">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-map-pin"></i>
                    </div>
                    <select class="form-control" name="Provincia" id="Provincia" onchange="GetCount($(this).val(),$('#Canton'),'')" required>
                        <option value="" disabled selected>Seleccione la provincia</option>
                        <?php
                        $SQL = sqlsrv_query($connARANDABD, "SELECT new_provinceId,new_name FROM [10.0.7.13].[OBCRM2013_MSCRM].dbo.new_provinceBase WITH (NOLOCK) where new_countryid = 'C0E2E77E-ABAD-E611-80C4-005056815852'");
                        while ($A = sqlsrv_fetch_array($SQL)) {
                            $IDPROV = $A['new_provinceId'];
                            $NPROV = utf8_encode($A['new_name']);
                        ?>
                            <option value="<?php echo $IDPROV; ?>"><?php echo $NPROV; ?></option>
                        <?php
                        }
                        ?>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-map-pin"></i>
                    </div>
                    <select class="form-control" name="Canton" id="Canton" required>
                        <option value="" disabled selected>Seleccione el cantón</option>
                    </select>
                </div>
            </div>