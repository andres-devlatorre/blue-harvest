class ChangeDefaultStatusForLivechats < ActiveRecord::Migration[7.1]
  def change
    change_column_default :livechats, :status, from: nil, to: 'waiting'
  end
end
